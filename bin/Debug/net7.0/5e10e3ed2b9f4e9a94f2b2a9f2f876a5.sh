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

ps 5080;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 5080 > /dev/null;
done;

for child in $(list_child_processes 5083);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/5e10e3ed2b9f4e9a94f2b2a9f2f876a5.sh;
