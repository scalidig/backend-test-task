#!/bin/bash
# wait-for-it.sh script

# Usage: wait-for-it.sh host:port [-t timeout] [-- command args]
# Example: wait-for-it.sh db:5432 -t 60 -- npm start

hostport=$1
shift
timeout=15
while [ $# -gt 0 ]; do
    case "$1" in
        -t)
            timeout="$2"
            shift 2
            ;;
        --)
            shift
            break
            ;;
        *)
            break
            ;;
    esac
done

until nc -z -w $timeout $hostport; do
    echo "Waiting for $hostport to be ready..."
    sleep 1
done

echo "$hostport is now ready, executing command..."
exec "$@"
