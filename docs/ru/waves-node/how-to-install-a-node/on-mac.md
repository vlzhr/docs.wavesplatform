# Установка ноды на macOS

Чтобы запустить ноду Waves, необходимо выполнить два шага:

1. Установить OpenJDK 8.

2. Загрузить файлы Waves и настроить приложение.

## Установка OpenJDK 8

Проверьте версию JDK с помощью команды:

```bash
java -version
```

**Примечание**: Не устанавливайте OpenJDK 8, если у вас уже установлена версия OpenJDK 11. Приложение ноды поддерживает версии 8 и 11.

Install [OpenJDK 8](https://github.com/AdoptOpenJDK/homebrew-openjdk) :

```bash
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

Проверьте версию JDK с помощью команды:

```bash
java -version
```

Если вы видите следующий результат, то переходите к следующему шагу:

```bash
java version "1.8.0_201"
Java(TM) SE Runtime Environment (build 1.8.0_201-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.201-b09, mixed mode)
```

**Note.** Do not install OpenJDK 8 If you already have OpenJDK 11 installed. The node Installation is supported in both versions 8 and 11.

## Загрузка пакета Waves и настройка приложения

[Загрузите последнюю версию](https://github.com/wavesplatform/Waves/releases) waves.jar и обязательного .conf файла конфигурации (для mainnet или testnet) в любую папку, например `~/waves`.

Отредактируйте файл конфигурации waves.conf, **это очень важно! От этого зависит безопасность вашего кошелька и средств!**

Откройте файл конфигурации своим любимым текстовым редактором, налейте в чашку вкусный чай и изучите статью [Конфигурация ноды](/ru/waves-node/node-configuration).

Запустите терминал `Terminal.app`, перейдите в папку с файлом jar с помощью команды `cd ~/waves` и запустите ноду следующей командой: `java -jar waves.jar waves.conf`.

## Дополнительная безопасность

Для дополнительной безопасности рекомендуется хранить приложение кошелек и файл конфигурации в зашифрованном разделе диска.

Также, возможно, вы захотите ограничить использование зашифрованных папок для некоторых пользователей. Для этого используйте параметр Chown. Подробное описание [тут](https://support.apple.com/en-us/HT208344).

Если вы хотите использовать RPC, необходимо защитить macOS с помощью встроенного или любого другого файервола. Подробно об этом [тут](https://support.apple.com/en-us/HT201642). Если ваш сервер находится в публичном доступе и вы хотите использовать RPC, то задействуйте только определенные методы, используя [Nginx's proxy\_pass module](http://nginx.org/ru/docs/http/ngx_http_proxy_module.html) и не забудьте назначить API key хэш в файле конфигурации Waves.

Не забывайте своевременно обновлять операционную систему и программное обеспечение системы безопасности.