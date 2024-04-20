package com.example.demo.controllers;

import com.example.demo.services.ApodService;
import com.example.demo.dto.NasaApiResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nasa")
public class NasaApiController {

    @Autowired
    private ApodService apodService;

    @GetMapping("/apod")
    public NasaApiResponse getAstronomyPictureOfTheDay(@RequestParam(required = false) String date) {
        return apodService.getAstronomyPictureOfTheDay(date);
    }

    @GetMapping("/apods")
    public List<NasaApiResponse> getMultipleAstronomyPicturesOfTheDay(@RequestParam(required = false) String start_date,
                                                                      @RequestParam(required = false) String end_date) {
        return apodService.getMultipleAstronomyPicturesOfTheDay(start_date, end_date);
    }
}
