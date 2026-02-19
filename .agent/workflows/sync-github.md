---
description: Автоматическая синхронизация проекта ii_finansist с приватным репозиторием GitHub
---

// turbo-all
1. Перейти в каталог приложения `ii_finansist`.
2. Добавить все изменения в индекс: `git add .`
3. Создать коммит с автоматическим описанием: `git commit -m "Automated update: $(date +'%Y-%m-%d %H:%M:%S')"`
4. Отправить изменения в основную ветку: `git push origin main`
5. Вернуться в корневой каталог.
6. Выполнить аналогичные действия для корневого каталога (репозиторий `finansist_codex`):
   - `git add .`
   - `git commit -m "Sync: $(date +'%Y-%m-%d %H:%M:%S')"`
   - `git push finansist_codex main`
