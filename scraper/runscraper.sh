#! /bin/bash
echo Starting to run scraper

for i in {51..57} # to 57
do
    # Set file contents
    j="http://www.asiapearltravels.com/language/lesson"$i"_script.php"
    echo $j
    destdir=../config/urls.config

    echo "$j" > "$destdir"
    # Call scraper.js
    node scraper.js
done
