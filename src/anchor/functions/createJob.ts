import { web3, BN } from "@coral-xyz/anchor";

export const createJob = async (program) => {
    const employer = web3.Keypair.generate();
    const worker = web3.Keypair.generate();
    const escrowAccount = web3.Keypair.generate();
    const job = web3.Keypair.generate();

    const jobId = "job1";
    const title = "Software Engineer";
    const pay = new BN(1000);

    const tx = await program.methods.createJob(jobId, title, pay)
      .accounts({
        job: job.publicKey,
        employer: employer.publicKey,
        worker: worker.publicKey,
        escrowAccount: escrowAccount.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([employer, worker, job, escrowAccount])
      .rpc();

    console.log('Transaction signature:', tx);

}