package com.hackathon.flight_ontime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;


@OpenAPIDefinition(
	info = @Info(title = "Flight On-Time API", version = "0.0.1",
		description = "APIs para la predicción de retrasos | APIs for delay prediction",
		contact = @Contact(name = "Hackathon Flight On-Time", email = "")
	)
)


@SpringBootApplication
public class FlightOntimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightOntimeApplication.class, args);
	}

}
