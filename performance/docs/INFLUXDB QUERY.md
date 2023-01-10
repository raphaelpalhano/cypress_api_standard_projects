# GENERAL QUERYS


FILTER HTTP_REQUEST: SELECT sum("value") FROM "http_reqs" WHERE $timeFilter GROUP BY time($__interval) fill(null)


FILTER VUS: SELECT mean("value") FROM "vus" WHERE $timeFilter GROUP BY time($__interval) fill(none)


SELECT sum("value") FROM "http_reqs" WHERE $timeFilter GROUP BY time($__interval) fill(null)

SELECT sum("value") FROM "checks" WHERE $timeFilter GROUP BY time($__interval), "check" fill(none)

SELECT max("value") FROM /^$Measurement$/ WHERE $timeFilter and value > 0 GROUP BY time($__interval) fill(none)


# LOAD QUERY

FILTER LOAD http_req: SELECT sum("value") FROM "http_reqs" WHERE "scenario" = 'load' AND $timeFilter GROUP BY time($__interval) fill(null)

SELECT mean("value") into "vus" from (SELECT * FROM "http_reqs" WHERE "scenario" = 'load') group by “scenario”


LOAD_US: FILTER VUS: SELECT mean("value") FROM "vus" WHERE $timeFilter GROUP BY time($__interval) fill(none)


CHECK_LOAD: SELECT sum("value") FROM "checks" WHERE "scenario" = 'load' AND $timeFilter GROUP BY time($__interval), "check" fill(none)


HTTP_RQ_DURATION: SELECT max("value") FROM /^$Measurement$/ WHERE $timeFilter and value > 0 GROUP BY time($__interval) fill(none)


SELECT max("value") FROM /^http_req_duration$/ WHERE "scenario" = 'load' and time >= now() - 12h and time <= now() and value > 0 GROUP BY time(1m) fill(none)

SELECT percentile("value", 95) FROM /^http_req_duration$/ WHERE "scenario" = 'load' and time >= now() - 12h and time <= now() and value > 0 GROUP BY time(1m) fill(none)

SELECT percentile("value", 90) FROM /^http_req_duration$/  WHERE "scenario" = 'load' and time >= now() - 12h and time <= now() and value > 0 GROUP BY time(1m) fill(none)

SELECT min("value") FROM /^http_req_duration$/  WHERE "scenario" = 'load' and time >= now() - 12h and time <= now() and value > 0 GROUP BY time(1m) fill(none)



FILTER_SCENARIO

http_req_duration: SELECT median("value") FROM /^$Measurement$/ WHERE ("name" =~ /^$URL$/ AND "scenario" =~ /^$Scenario$/ AND "name" =~ /^$Tag$/) AND $timeFilter GROUP BY time($__interval), "name" fill(null)

Latência_group: SELECT count("value"), min("value"), median("value"), max("value"), mean("value"), percentile("value", 95) FROM /^$Measurement$/ WHERE ("scenario" =~ /^$Scenario$/ AND "name" =~ /^$Tag$/) AND $timeFilter GROUP BY "scenario"

SELECT median("value") FROM /^$Measurement$/ WHERE ("name" =~ /^$URL$/ AND "scenario" =~ /^$Scenario$/ AND "name" =~ /^$Tag$/) AND $timeFilter GROUP BY time($__interval), "name" fill(null)


SELECT median("value") FROM /^(http_req_duration)$/ WHERE ("name" =~ /^*$/ AND "scenario" =~ /^(load|soak|spike|stress|immersion)$/ and time <= now() GROUP BY time(1s), "name" fill(null)