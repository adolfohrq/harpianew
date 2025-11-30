import { Client } from 'basic-ftp';
import { config } from 'dotenv';

// Carrega variáveis de ambiente do .env.local
config({ path: '.env.local' });

// Valida se as credenciais estão configuradas
const requiredEnvVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Variáveis de ambiente faltando:', missingVars.join(', '));
  console.error('📝 Crie um arquivo .env.local com as credenciais FTP');
  console.error('   Exemplo:');
  console.error('   FTP_HOST=seu-host.com');
  console.error('   FTP_USER=seu-usuario');
  console.error('   FTP_PASSWORD=sua-senha');
  process.exit(1);
}

const FTP_CONFIG = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  secure: process.env.FTP_SECURE === 'true',
};

const LOCAL_DIR = './dist';
const REMOTE_DIR = '/';

async function deploy() {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    console.log('🔌 Conectando ao FTP...');
    await client.access(FTP_CONFIG);
    console.log('✅ Conectado!');

    console.log('📁 Navegando para', REMOTE_DIR);
    await client.ensureDir(REMOTE_DIR);

    console.log('📤 Fazendo upload dos arquivos...');
    await client.uploadFromDir(LOCAL_DIR, REMOTE_DIR);

    console.log('✅ Deploy concluído com sucesso!');
    console.log('🌐 Site atualizado em: https://agenciaharpia.com.br');
  } catch (err) {
    console.error('❌ Erro no deploy:', err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
