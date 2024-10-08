import { IdlAccounts, Program, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Escrow } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from 'buffer';
 
console.log(Buffer)
window.Buffer = window.Buffer || Buffer;

const programId = new PublicKey("2WVfb7G4DuvwgkJ9wm5SSDypBLECTfmpL78CwAosE3AD");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
 
// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<Escrow>(IDL, programId, {
  connection,
});

export const getProgram = (provider: AnchorProvider) => {
    return new Program(idl, programId, provider);
  };
 
// export const [counterPDA] = PublicKey.findProgramAddressSync(
//   [Buffer.from("counter")],
//   program.programId,
// );
 
// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
export type EscrowData = IdlAccounts<Escrow>["job"];