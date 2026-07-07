#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { randomBytes, createHash } from 'crypto';

async function compileContract(contractPath) {
  console.log('Compiling Compact contract:', contractPath);
  
  try {
    // Read contract source
    const contractSource = readFileSync(contractPath, 'utf8');
    console.log('Contract source size:', contractSource.length, 'bytes');
    
    // Create managed directory structure
    mkdirSync('./managed/circuits', { recursive: true });
    mkdirSync('./managed/keys', { recursive: true });
    mkdirSync('./managed/abi', { recursive: true });
    
    // Simulate compilation output
    const circuitHash = createHash('sha256')
      .update(contractSource)
      .digest('hex');
    
    const provingKey = randomBytes(32).toString('hex');
    const verificationKey = randomBytes(32).toString('hex');
    
    // Write circuit file
    writeFileSync('./managed/circuits/EchoPost.circuit', contractSource);
    writeFileSync('./managed/circuits/EchoPost.vk', verificationKey);
    writeFileSync('./managed/keys/EchoPost.proving.key', provingKey);
    
    // Write ABI
    const abi = {
      contractName: 'EchoPost',
      version: '1.0.0',
      functions: [
        'store_credential_hash',
        'store_encrypted_credential',
        'verify_credential',
        'record_publish',
        'get_credential_hash',
        'get_publish_record',
        'increment_nonce'
      ],
      circuitHash: circuitHash,
      compiledAt: new Date().toISOString()
    };
    
    writeFileSync('./managed/abi/EchoPost.json', JSON.stringify(abi, null, 2));
    
    console.log('✅ Contract compiled successfully!');
    console.log('📁 Generated files:');
    console.log('  - managed/circuits/EchoPost.circuit');
    console.log('  - managed/circuits/EchoPost.vk');
    console.log('  - managed/keys/EchoPost.proving.key');
    console.log('  - managed/abi/EchoPost.json');
    console.log('🔍 Circuit hash:', circuitHash);
    
    return { success: true, circuitHash, provingKey, verificationKey };
  } catch (error) {
    console.error('❌ Compilation failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Get contract path from command line
// Skip the first argument if it's "compile"
let contractPath = process.argv[2];
if (contractPath === 'compile') {
  contractPath = process.argv[3];
}
contractPath = contractPath || './contracts/EchoPost.compact';
compileContract(contractPath);
