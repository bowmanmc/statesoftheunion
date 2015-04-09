#!/bin/bash

STATES="AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY"

for state in $STATES
do
  echo "Processing $state"
  ogr2ogr -f GeoJSON -where "STUSPS = '$state'" ${state}.json cb_2013_us_state_500k.shp

done


