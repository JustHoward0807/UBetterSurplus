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

ps 30505;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 30505 > /dev/null;
done;

for child in $(list_child_processes 30514);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/9282b685f4e84cf58e11e4ac37c8d0e8.sh;
