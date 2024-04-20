package com.example.demo.services;

import com.example.demo.dto.NasaApiResponse;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApodService {

    @Value("${nasa.api.key}")
    private String apiKey;
    String apiUrl = "https://api.nasa.gov/planetary/apod";
    RestTemplate restTemplate = new RestTemplate();

    public NasaApiResponse getAstronomyPictureOfTheDay(String date) {

        String url = apiUrl + "?api_key=" + apiKey;

        if (date != null) {
            url += "&date=" + date;
        }
        System.out.println(url);

        ResponseEntity<NasaApiResponse> responseEntity = restTemplate.getForEntity(url, NasaApiResponse.class);
        return responseEntity.getBody();
    }

    public List<NasaApiResponse> getMultipleAstronomyPicturesOfTheDay(String start_date, String end_date) {
        String url = apiUrl + "?api_key=" + apiKey;

        if (start_date != null && end_date != null) {
            url += "&start_date=" + start_date + "&end_date=" + end_date;
        }
        System.out.println(url);

        ResponseEntity<NasaApiResponse[]> responseEntity = restTemplate.getForEntity(url, NasaApiResponse[].class);
        return Arrays.asList(responseEntity.getBody());
    }
}

