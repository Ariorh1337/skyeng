/*
kibanaQuery
@param "query" - typeOf = String
@param "timeStart" - typeOf = Object
@comment - timeStart = new Date("String")
@param "timeEnd" - typeOf = Object
@comment - timeEnd = new Date("String")
*/
function kibanaQuery(query, timeStart, timeEnd) {
    return fetch("https://kibana-logs.skyeng.link/elasticsearch/_msearch?rest_total_hits_as_int=true&ignore_throttled=true", {
        "headers": {
            "content-type": "application/x-ndjson",
            "kbn-version": "7.4.2",
        },
        "body": `{\"index\":\"*\",\"ignore_unavailable\":true,\"preference\":1607855770186}\n{\"timeout\":\"30000ms\",\"version\":true,\"size\":500,\"sort\":[{\"@timestamp\":{\"order\":\"asc\",\"unmapped_type\":\"boolean\"}}],\"_source\":{\"excludes\":[]},\"aggs\":{\"2\":{\"date_histogram\":{\"field\":\"@timestamp\",\"fixed_interval\":\"10m\",\"time_zone\":\"Europe/Moscow\",\"min_doc_count\":1}}},\"stored_fields\":[\"*\"],\"script_fields\":{},\"docvalue_fields\":[{\"field\":\"@timestamp\",\"format\":\"date_time\"},{\"field\":\"access_token.user_token.expiration_time\",\"format\":\"date_time\"},{\"field\":\"alert_time\",\"format\":\"date_time\"},{\"field\":\"beats_state.timestamp\",\"format\":\"date_time\"},{\"field\":\"beats_stats.timestamp\",\"format\":\"date_time\"},{\"field\":\"canvas-element.@created\",\"format\":\"date_time\"},{\"field\":\"canvas-element.@timestamp\",\"format\":\"date_time\"},{\"field\":\"canvas-workpad.@created\",\"format\":\"date_time\"},{\"field\":\"canvas-workpad.@timestamp\",\"format\":\"date_time\"},{\"field\":\"completed_at\",\"format\":\"date_time\"},{\"field\":\"container.labels.org_label-schema_build-date\",\"format\":\"date_time\"},{\"field\":\"created_at\",\"format\":\"date_time\"},{\"field\":\"creation_time\",\"format\":\"date_time\"},{\"field\":\"endtime\",\"format\":\"date_time\"},{\"field\":\"expiration_time\",\"format\":\"date_time\"},{\"field\":\"job_stats.data_counts.earliest_record_timestamp\",\"format\":\"date_time\"},{\"field\":\"job_stats.data_counts.latest_record_timestamp\",\"format\":\"date_time\"},{\"field\":\"kibana_stats.timestamp\",\"format\":\"date_time\"},{\"field\":\"logstash_stats.timestamp\",\"format\":\"date_time\"},{\"field\":\"maps-telemetry.timeCaptured\",\"format\":\"date_time\"},{\"field\":\"match_time\",\"format\":\"date_time\"},{\"field\":\"process_expiration\",\"format\":\"date_time\"},{\"field\":\"read_timestamp\",\"format\":\"date_time\"},{\"field\":\"refresh_token.refresh_time\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline-note.created\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline-note.updated\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline-pinned-event.created\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline-pinned-event.updated\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline.created\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline.dateRange.end\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline.dateRange.start\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline.favorite.favoriteDate\",\"format\":\"date_time\"},{\"field\":\"siem-ui-timeline.updated\",\"format\":\"date_time\"},{\"field\":\"skyeng.context.integration_request.queryData.date_before\",\"format\":\"date_time\"},{\"field\":\"skyeng.context.integration_request.queryData.startingDate\",\"format\":\"date_time\"},{\"field\":\"source_node.timestamp\",\"format\":\"date_time\"},{\"field\":\"started_at\",\"format\":\"date_time\"},{\"field\":\"starttime\",\"format\":\"date_time\"},{\"field\":\"task.retryAt\",\"format\":\"date_time\"},{\"field\":\"task.runAt\",\"format\":\"date_time\"},{\"field\":\"task.scheduledAt\",\"format\":\"date_time\"},{\"field\":\"task.startedAt\",\"format\":\"date_time\"},{\"field\":\"timestamp\",\"format\":\"date_time\"},{\"field\":\"until\",\"format\":\"date_time\"},{\"field\":\"updated_at\",\"format\":\"date_time\"},{\"field\":\"url.accessDate\",\"format\":\"date_time\"},{\"field\":\"url.createDate\",\"format\":\"date_time\"}],\"query\":{\"bool\":{\"must\":[{\"query_string\":{\"query\":\"${query}\",\"analyze_wildcard\":true,\"time_zone\":\"Europe/Moscow\"}}],\"filter\":[{\"range\":{\"@timestamp\":{\"format\":\"strict_date_optional_time\",\"gte\":\"${timeStart.toJSON()}\",\"lte\":\"${timeEnd.toJSON()}\"}}}],\"should\":[],\"must_not\":[]}},\"highlight\":{\"pre_tags\":[\"@kibana-highlighted-field@\"],\"post_tags\":[\"@/kibana-highlighted-field@\"],\"fields\":{\"*\":{}},\"fragment_size\":2147483647}}\n`,
        "method": "POST",
        "credentials": "include"
    }).then(r => r.json());
}

/*
getKibanaLogByIDs
@param "type" - typeOf = String
@comment - Строковое значение, может быть userId или roomId
@param "userIDs" - typeOf = Array
@comment - Массив с нужным кол-вом искомых данных
@param "lessonDateTimeStr" - typeOf = String
@comment - Строковое значение даты\времени, без секунд, формат: "гггг-мм-дд чч:мм"
*/
async function getKibanaLogByIDs(type = 'userId', userIDs = [2310091, 2314498], lessonDateTimeStr = '2020-12-14 14:00') {
    let urlUser = userIDs.flatMap((elm) => {
        if (elm && elm !== '') return [`${type}:${elm}`];
        else return [];
    })

    console.log(urlUser);

    const lesson = new Date(lessonDateTimeStr);
    const lessonStart = new Date(Number(lesson) - 10 * 60 * 1000);
    const lessonEnd = new Date(Number(lesson) + 55 * 60 * 1000);

    const query = `(${(urlUser.length > 1) ? urlUser.join(' OR ') : urlUser.join('')}) AND ((event:tech-summary-minute) OR (details.event.type:webRTCStateUp) OR (event:videoRoomEvent AND details.source:publisher))`;

    return kibanaQuery(query, lessonStart, lessonEnd);
}

/*
getNearestLesson
@param "userID" - typeOf = Number \ String
@comment - Цифровое или строковое значение ID пользователя
*/
async function getNearestLesson(userID) {
    const timeNow = new Date();
    const timeBefore = new Date(Number(timeNow) + 14 * 24 * 60 * 60 * 1000);
    const query = `details.event.type: webRTCStateUp AND userId: ${userID}`;

    return kibanaQuery(query, timeBefore, timeNow);
}