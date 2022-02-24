package com.phunq.backend.adafruit;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.adafruit.dto.FeedValueDto;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Service
@Slf4j
@PropertySource("classpath:env.properties")
public final class AdafruitService {

  @Autowired
  private ObjectMapper mapper;

  @Value("${adafruit.baseurl}")
  private String baseUrl;

  @Value("${adafruit.username}")
  private String username;

  @Value("${adafruit.key}")
  private String key;

  @Value("${adafruit.feed.groupId}")
  private String groupId;

  private static final String START_TIME_HEADER = "start_time";

  public List<FeedDto> getAllFeeds() throws IOException {
    log.info("Get all feeds ....");
    Response response = callApi("/feeds", "GET", null, null);
    if (response.isSuccessful()) {
      return handleResponseBodyWithListEntity(response.body(), FeedDto.class)
          .stream().filter(feed -> feed.getGroup().getId().equals(groupId))
          .collect(Collectors.toList());
    } else {
      log.error("getAllFeeds() is fail");
      return new ArrayList<>();
    }
  }

  public List<FeedValueDto> getFeedValues(String feedKey, LocalDateTime pivot) throws IOException {
    log.info(String.format("Get value of feed [%s] after %s", feedKey, pivot.toString()));
    String entrypoint = String.format("/feeds/%s/data", feedKey);
    Map<String, String> param = new TreeMap<>() {{
      put(START_TIME_HEADER, pivot.toString());
    }};
    Response response = callApi(entrypoint, "GET", null, param);
    if (response.isSuccessful()) {
      return handleResponseBodyWithListEntity(response.body(), FeedValueDto.class);
    } else {
      log.error("getFeedValues() is fail");
      return new ArrayList<>();
    }
  }

  private Response callApi(
      String entrypoint, String method, RequestBody body, Map<String, String> param)
      throws IOException {
    OkHttpClient client = new OkHttpClient().newBuilder()
        .build();
    HttpUrl.Builder urlBuilder
        = Objects.requireNonNull(HttpUrl.parse(baseUrl() + entrypoint)).newBuilder();
    if (param != null) {
      param.forEach(urlBuilder::addQueryParameter);
    }
    Request request = new Request.Builder()
        .url(urlBuilder.build())
        .method(method, body)
        .build();
    return client.newCall(request).execute();
  }

  public <T> List<T> handleResponseBodyWithListEntity(ResponseBody responseBody,
      Class<T> entityClass)
      throws IOException {
    String body = Objects.requireNonNull(responseBody).string();
    List<T> retval = new ArrayList<>();
    for (JsonNode node : mapper.readTree(body)) {
      T entity = mapper.readValue(node.toString(), entityClass);
      retval.add(entity);
//      if (feed.getGroup().getId().equals(groupId)) {
//        feeds.add(feed);
//      }
    }
    return retval;
  }

  private List<FeedDto> processGetAllFeedsBody(ResponseBody responseBody) throws IOException {
    String body = Objects.requireNonNull(responseBody).string();
    List<FeedDto> feeds = new ArrayList<>();
    for (JsonNode node : mapper.readTree(body)) {
      FeedDto feed = mapper.readValue(node.toString(), FeedDto.class);
      if (feed.getGroup().getId().equals(groupId)) {
        feeds.add(feed);
      }
    }
    return feeds;
  }

  private String baseUrl() {
    return String.format("%s/%s", baseUrl, username);
  }

}
