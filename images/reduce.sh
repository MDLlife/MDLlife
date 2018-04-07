#sudo apt-get install imagemagick

count=0
quality=80
rm -rf $quality
mkdir $quality
for i in $(find . -type f -name '201*.*g' |sort); do
  let counter++
  if [[ "$counter" -gt 0 ]]; then
    echo $i
    convert -resize 375x216 -quality $quality $PWD/$i "$PWD/$quality/$i"
  fi
done
