import fs from 'fs';
import path from 'path';

// Função recursiva para obter todos os caminhos dos arquivos na pasta e subpastas
function getFilePaths(folderPath) {
  let filePaths = [];

  // Lê os itens no diretório
  const items = fs.readdirSync(folderPath);

  // Itera sobre os itens
  items.forEach((item) => {
    const itemPath = path.join(folderPath, item);

    // Verifica se o item é um diretório
    if (fs.statSync(itemPath).isDirectory()) {
      // Se for um diretório, chama recursivamente a função para esse diretório
      filePaths = filePaths.concat(getFilePaths(itemPath));
    } else {
      // Se for um arquivo, adiciona o caminho à lista
      filePaths.push(itemPath);
    }
  });

  return filePaths;
}

// Obtém os caminhos dos arquivos na pasta atual (use '.' para a pasta atual)
const currentFolder = '.';
const filepaths = getFilePaths(currentFolder);

// Imprime os caminhos dos arquivos
filepaths.forEach((filepath) => {
  console.log(filepath);
});
