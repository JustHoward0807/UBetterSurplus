function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 33530;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 33530 > /dev/null;
done;

for child in $(list_child_processes 33533);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/2f8a9a7d8ef845dc828b1b304b36f85f.sh;
