# Richard la Ruina
![GitHub](https://img.shields.io/github/license/GreenScreen410/GreenBot-Discord?style=flat-square) ![GitHub package.json version](https://img.shields.io/github/package-json/v/GreenScreen410/GreenBot-Discord?style=flat-square) ![node-current](https://img.shields.io/node/v/discord.js?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/GreenScreen410/GreenBot-Discord?style=flat-square) [![CodeFactor](https://www.codefactor.io/repository/github/greenscreen410/greenbot-discord/badge)](https://www.codefactor.io/repository/github/greenscreen410/greenbot-discord)
</br>14.04.2023 ~
## Description du fichier
* **assets** - Contient des données telles que des images et des fichiers audio.

* **commands** - Contient des commandes slash. Toutes les commandes sous forme de texte ont été supprimées.

* **events** - contient des slashs, des ~~commandes textuelles~~ et des fichiers de détection de commandes musicales.

* **handler** - Utilisé pour appeler des fichiers dans le dossier de commandes.

* **.gitignore** - Contient les fichiers à ignorer lors du téléchargement sur Github. Ce fichier n'affecte pas l'exécution du bot.

* **index.js** - Ce fichier est utilisé pour exécuter le bot.

* **package-lock.json** - Il s'agit du fichier lié au package npm.

* **package.json** - Fichiers liés aux packages npm.

## Q&A
> Q: 왜 파일을 불러올 때 path 모듈도 같이 사용하나요?

A: 그린Bot은 v1.9.0부터 TypeScript로 변경되게 되었고, 이에 따라 자바스크립트로의 컴파일 과정이 필요해졌습니다.<br>
컴파일 시에는 dist 라는 폴더가 생기게 되는데, 폴더 경로가 고장날 수 있으므로 path 모듈을 사용하였습니다.