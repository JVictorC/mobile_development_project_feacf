# 📱 Mobile Development Project - FEACF

Aplicação móvel desenvolvida com **React Native** e **Expo**, utilizando
**Expo Router** para roteamento baseado em arquivos (*file‑based
routing*) e **Context API** para gerenciamento de autenticação.

O objetivo do projeto é demonstrar uma estrutura organizada e escalável
para aplicações mobile modernas.

------------------------------------------------------------------------

# 🚀 Tecnologias Utilizadas

-   React Native
-   Expo
-   Expo Router
-   Context API
-   TypeScript

------------------------------------------------------------------------

# 📂 Estrutura do Projeto

A arquitetura segue o padrão **File‑based Routing** do Expo Router.

    .
    ├── app/                  # Diretório principal de rotas (Expo Router)
    │   ├── (auth)/           # Rotas autenticadas (Dashboard, Profile)
    │   ├── (public)/         # Rotas públicas (Login, Cadastro)
    │   ├── _layout.tsx       # Layout principal e Provider de autenticação
    │   └── index.tsx         # Ponto de entrada da aplicação
    │
    ├── src/                  # Código fonte centralizado
    │   ├── components/       # Componentes reutilizáveis
    │   ├── contexts/         # Contextos da aplicação (AuthContext)
    │   ├── services/         # Configurações de API (Axios/Firebase)
    │   └── utils/            # Funções auxiliares
    │
    ├── assets/               # Imagens, ícones e fontes
    ├── app.json              # Configurações do Expo
    └── package.json          # Dependências e scripts

------------------------------------------------------------------------

# ⚙️ Instalação

Clone o repositório:

    git clone https://github.com/JVictorC/mobile_development_project_feacf.git

Entre na pasta do projeto:

    cd mobile_development_project_feacf

Instale as dependências:

    npm install

------------------------------------------------------------------------

# ▶️ Executando o Projeto

    npm start

Selecione entre as opcoes listadas a qual voce deseja rodar, ex:

      › Press a │ open Android
      › Press i │ open iOS simulator
      › Press w │ open web

  Plataforma              Comando
  ----------------------- ----------------------------------------
  Web                     `npm run web`
  Android (Localhost)     `npx expo start --android --localhost`
  iOS (Simulador)         `npm run ios`
  Tunnel (Rede externa)   `npx expo start --tunnel`

------------------------------------------------------------------------

### Limpar cache do Expo

Caso ocorram erros após mudanças estruturais:

    npx expo start -c

------------------------------------------------------------------------

### Erro de atualização remota

Se aparecer a mensagem:

    Failed to download remote update

Verifique a configuração no **app.json**:

``` json
{
  "updates": {
    "checkAutomatically": "NEVER"
  }
}
```

Isso evita que o Expo tente buscar atualizações remotas durante o
desenvolvimento local.

------------------------------------------------------------------------

# 📄 Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo `LICENSE` para mais informações.

------------------------------------------------------------------------

# 👨‍💻 Autor

Desenvolvido por **JVictorC**
