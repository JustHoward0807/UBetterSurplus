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

ps 48770;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 48770 > /dev/null;
done;

for child in $(list_child_processes 48773);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/howard/Documents/Github/UBetterSurplus/bin/Debug/net7.0/0c0431302edc4f9c852186c1b76613bd.sh;
