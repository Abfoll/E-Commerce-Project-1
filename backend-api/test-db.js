const { testConnection } = require('./config/database');

async function test() {
  console.log('🧪 Testing database connection...');
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Using: ${process.env.DATABASE_URL ? 'Neon' : 'Local'} database`);
  
  await testConnection();
  
  // Close connection after test
  process.exit(0);
}

test();