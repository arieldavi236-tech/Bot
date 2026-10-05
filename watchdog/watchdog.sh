#!/data/data/com.termux/files/usr/bin/bash

BOT="ariel-bot"
LOG="$HOME/storage/ariel-bot/watchdog/watchdog.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ♛ Watchdog iniciado" >> "$LOG"

while true; do
    STATUS=$(pm2 pid "$BOT" 2>/dev/null)

    if [ -z "$STATUS" ] || [ "$STATUS" = "0" ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ♛ Bot parado. Reiniciando..." >> "$LOG"
        pm2 restart "$BOT" >> "$LOG" 2>&1
    fi

    sleep 30
done
