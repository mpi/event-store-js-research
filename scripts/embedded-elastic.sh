#!/bin/bash

command="$1"

rm -rf ./build/elasticsearch-*/data

PID="$(lsof -i :9200 | grep java | awk '{print $2}'| sed -n '2p')"
if [ ! -z "$PID" ]; then
  echo "*** Stopping: $PID"
  $(kill -9 $PID)
fi

if [ "$command" == "stop" ]; then
  exit 0
fi

mkdir -p build
cd build

if [ ! -f "elasticsearch.zip" ]; then
  echo "*** Dowloading Elasticsearch"
  curl https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.0.zip > elasticsearch.zip
  echo "*** Unzipping"
  unzip elasticsearch.zip
fi

printf "*** Starting"
./elasticsearch-*/bin/elasticsearch -E http.port=9200 -E transport.tcp.port=9300 > elasticsearch.log &

status="unknown"

tries=0

while [ "$status" != "green" ]; do

  printf "."
  sleep 1
  status=$(curl --silent http://localhost:9200/_cluster/health | grep -Po '(?<="status":")[^"]+')
  tries=$((tries+1))

  if [ "$tries" -gt "60" ]; then
    echo "fail"
    echo "!!! Timeout waiting for Elasticsearch to start!"
    exit 1
  fi

done

echo "done"
echo "*** Started [status=$status]"

if [ "$command" == "--restore" ]; then
  echo "*** Restoring backup"
  curl -XPUT 'http://localhost:9200/_snapshot/sh-local-backup' -d '{"type":"fs","settings":{"location":"/home/mpi/dev/backups/es-sh-backup"}}' -H 'Content-Type: application/json'
  curl -XPOST 'http://localhost:9200/_snapshot/sh-local-backup/s20181210/_restore'
else
  echo "*** Creating schema"
  node ../scripts/create-schema.js
fi

if [ "$command" == "--demo" ]; then
  echo "*** Populating DEMO data"
  node ../scripts/demo-data.js
  echo "*** DEMO data populated!"
fi