import React, { useState, useEffect } from 'react';
import { PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { Escrow, IDL } from '../anchor/idl';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';

window.Buffer = window.Buffer || Buffer;

const loadKeypair = async (fileName) => {
  const response = await fetch(`/${fileName}`);
  const secretKey = await response.json();
  return Keypair.fromSecretKey(Uint8Array.from(secretKey));
};

const Test = () => {
  const { publicKey, signTransaction } = useWallet();
  const [jobId, setJobId] = useState('');
  const [title, setTitle] = useState('');
  const [pay, setPay] = useState('');
  const [status, setStatus] = useState('');

  const network = WalletAdapterNetwork.Testnet;
  const connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl(network), 'confirmed');
  const provider = new AnchorProvider(connection, { publicKey, signTransaction }, { preflightCommitment: 'processed' });
  anchor.setProvider(provider);

  const programId = new PublicKey('Bpy2YAC8LuB4Nvr1dAhQcQkvgAXt18SyjY5d61WAwePB');
  const program = new Program<Escrow>(IDL, programId, provider);

  const [employer, setEmployer] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Load keypairs when the component mounts
    const loadKeypairs = async () => {
      const employerKeypair = await loadKeypair('../../employer-keypair.json');
      const workerKeypair = await loadKeypair('../../worker-keypair.json');
      setEmployer(employerKeypair);
      setWorker(workerKeypair);
    };

    loadKeypairs();
  }, []);

  const airdropSol = async (publicKey) => {
    const airdropSignature = await connection.requestAirdrop(publicKey, 1e9); // 1 SOL
    await connection.confirmTransaction(airdropSignature);
  };

  const createJob = async () => {
    // Generate new Keypairs for job and escrow account
    const job = Keypair.generate();
    const escrowAccount = Keypair.generate();

    if (!employer || !worker) {
      console.error('Employer and worker keypairs are not loaded yet.');
      return;
    }

    try {
      // Airdrop SOL to all accounts
      await airdropSol(employer.publicKey);
      await airdropSol(worker.publicKey);
      await airdropSol(job.publicKey);
      await airdropSol(escrowAccount.publicKey);

      await program.methods.createJob(jobId, title, new anchor.BN(pay))
        .accounts({
          job: job.publicKey,
          employer: employer.publicKey,
          worker: worker.publicKey,
          escrowAccount: escrowAccount.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([employer, worker, job, escrowAccount])
        .rpc();

      const jobAccount = await program.account.job.fetch(job.publicKey);
      setStatus(`Job Created: ${jobAccount.status}`);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>
      <h1>Escrow Job Management</h1>
      <input
        type="text"
        placeholder="Job ID"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Pay"
        value={pay}
        onChange={(e) => setPay(e.target.value)}
      />
      <button onClick={createJob}>Create Job</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default Test;