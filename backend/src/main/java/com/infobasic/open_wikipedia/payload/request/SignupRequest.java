package com.infobasic.open_wikipedia.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

@Data
@AllArgsConstructor
public class SignupRequest {
  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 40)
  private String password;

  @NotBlank
  @Size(max = 40)
  private String firstName;

  @NotBlank
  @Size(max = 40)
  private String lastName;

}
