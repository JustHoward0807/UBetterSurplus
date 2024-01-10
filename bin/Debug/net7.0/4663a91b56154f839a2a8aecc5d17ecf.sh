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

ps 70254;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 70254 > /dev/null;
done;

for child in $(list_child_processes 70258);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/4663a91b56154f839a2a8aecc5d17ecf.sh;
