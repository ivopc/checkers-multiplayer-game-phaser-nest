# Blaze 1 Bet
Arquivos que criam um back-end para o projeto Blaze 1 Bet

## Execução do projeto
### Dependências
Para instalar as dependências sem verificação da versão utilize o seguinte comando
```bash
npm ci
```

Para instalar as dependências de forma normal utilize o seguinte comando
```bash
npm i
```

### Variáveis de ambiente
Agora devemos definir as variáveis de ambiente utilizando o arquivo `.example` de exemplo para obter os nomes delas, se você tiver problema para informar os valores entre em contato com algum dev do back-end

### Docker
Para criar o container utilize o seguinte comando
```bash
docker-compose up -d
```

Para iniciar novamente o container utilize o seguinte comando
```bash
docker-compose start
```

Para pausar a execução do container utilize o seguinte comando
```bash
docker-compose stop
```

Para excluir o container utilize o seguinte comando
```bash
docker-compose down
```

### Banco de dados
Para executar as migrations utilize o seguinte atalho
```bash
npm run deploy
```

Para acessar o bando de dados utilize o seguinte atalho
```bash
npm run studio
```

Para criar novas migrations utilize o seguinte atalho
```bash
npm run migrate
```

Para apagar os dados utilize o seguinte atalho
```bash
npm run reset
```

Para criar as tipagem utilize o seguinte comando
```bash
npm run generate
```

### Servidor
Para executar o servidor de forma que ele reiniciei ao detectar modificações utilizer o seguinte atalho
```bash
npm run start:dev
```

Para consumir as rotas você pode utilizar a collection para o Insomnia que está na pasta docs

## Testes automatizado
Para executar os testes unitário utilize o seguinte atalho
```bash
npm run test
```

Para executar os testes unitário de forma que ele reiniciei ao detectar modificações utilize o seguinte atalho
```bash
npm run test:watch
```

Para criar o mapeamento de cobertura dos testes unitário utilize o seguinte atalho
```bash
npm run test:cov
```

Para executar os testes de ponta a ponta utilizer o seguinte atalho
```bash
npm run test:e2e
```
