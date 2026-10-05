const http = require('http');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ ONLINE\n');
}).listen(port, '0.0.0.0', () => {
  console.log(`[Render] Servidor HTTP ativo na porta ${port}`);
});
