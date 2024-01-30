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

ps 68930;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 68930 > /dev/null;
done;

for child in $(list_child_processes 68938);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/9dd2e1c1c1424c5d83ac2917407203e3.sh;
