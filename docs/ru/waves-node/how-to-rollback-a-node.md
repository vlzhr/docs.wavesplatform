# Как откатить ноду

Можно откатить ноду до определённой высоты. Все блоки после заданной высоты будут удалены.

Есть два способа:

1. Если это откат не более чем на 2000 блоков, тогда владелец ноды может воспользоваться REST/debug/rollback с применением API key (Изучите [Waves Full Node API](https://nodes.wavesplatform.com/api-docs/index.html#!/debug/rollback)\). Например,

   ```js
     {
        "rollbackTo": 1057490,
        "returnTransactionsToUtx": false
      }
   ```

2. Для отката более чем на 2000 блоков, следуйте инструкциям, описанным в статье [Способы загрузки актуального блокчейна](/ru/waves-node/options-for-getting-actual-blockchain).

Можно воспользоваться утилитой [chaincmp](https://github.com/wavesplatform/gowaves/releases/tag/v0.1.2) для сравнения блокчейна вашей ноды и образцов других нод.

## Основные проблемы при откате ноды

Если пользователь запрашивает откат через **curl/swagger** и получает ошибку **error 503**, это не значит, что запрос не обрабатывается (это тайм-аут процесса). Чтобы проверить, производит ли нода обработку, убедитесь в том, что состояние ноды не меняется (проверкой статуса, убедитесь что высота блоков не меняется) после того, как начат откат. Потребуется некоторое время, чтобы снова начать синхронизацию из желаемой локации.
Нода может обработать откат до 2000 блоков без перезапуска, поэтому, если ваша нода по какой-то причине оказалась на форке, нужно обязательно её как можно скорее откатить, чтобы не пришлось восстанавливать состояние более долгими методами.
