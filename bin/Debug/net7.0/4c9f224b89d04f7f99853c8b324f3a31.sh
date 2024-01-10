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

ps 69238;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 69238 > /dev/null;
done;

for child in $(list_child_processes 69241);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/4c9f224b89d04f7f99853c8b324f3a31.sh;
