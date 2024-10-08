export type Escrow = {
    "version": "0.1.0",
    "name": "escrow",
    "instructions": [
      {
        "name": "createJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "employer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "worker",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "jobId",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "pay",
            "type": "u64"
          }
        ]
      },
      {
        "name": "approveJobWorker",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "worker",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "approveJobEmployer",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "employer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "worker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "rejectJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "job",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "id",
              "type": "string"
            },
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "pay",
              "type": "u64"
            },
            {
              "name": "employer",
              "type": "publicKey"
            },
            {
              "name": "worker",
              "type": "publicKey"
            },
            {
              "name": "workerApproved",
              "type": "bool"
            },
            {
              "name": "employerApproved",
              "type": "bool"
            },
            {
              "name": "status",
              "type": {
                "defined": "JobStatus"
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "JobStatus",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "Pending"
            },
            {
              "name": "Completed"
            },
            {
              "name": "Rejected"
            }
          ]
        }
      }
    ]
  };
  
  export const IDL: Escrow = {
    "version": "0.1.0",
    "name": "escrow",
    "instructions": [
      {
        "name": "createJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "employer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "worker",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "jobId",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "pay",
            "type": "u64"
          }
        ]
      },
      {
        "name": "approveJobWorker",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "worker",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "approveJobEmployer",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "employer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "worker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "rejectJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "job",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "id",
              "type": "string"
            },
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "pay",
              "type": "u64"
            },
            {
              "name": "employer",
              "type": "publicKey"
            },
            {
              "name": "worker",
              "type": "publicKey"
            },
            {
              "name": "workerApproved",
              "type": "bool"
            },
            {
              "name": "employerApproved",
              "type": "bool"
            },
            {
              "name": "status",
              "type": {
                "defined": "JobStatus"
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "JobStatus",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "Pending"
            },
            {
              "name": "Completed"
            },
            {
              "name": "Rejected"
            }
          ]
        }
      }
    ]
  };
  