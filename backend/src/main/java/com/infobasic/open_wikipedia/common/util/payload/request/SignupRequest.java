package com.infobasic.open_wikipedia.common.util.payload.request;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

@Data
@AllArgsConstructor
public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  // private Set<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  private String firstName;
  private String lastName;
  private LocalDate birthday;

}
