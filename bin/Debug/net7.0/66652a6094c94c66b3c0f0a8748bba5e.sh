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

ps 64178;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 64178 > /dev/null;
done;

for child in $(list_child_processes 64181);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/66652a6094c94c66b3c0f0a8748bba5e.sh;
