package com.phunq.backend.entity;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import javax.persistence.*;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@Entity
@Data
public class User implements UserDetails {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

  @Column(unique = true)
  private String username;

  private String password;
  private String fullname;
  private LocalDate dob;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  private Boolean enable = true;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  private List<FeedGroup> groups;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
  }

  @Override
  public boolean isAccountNonExpired() {
    return false;
  }

  @Override
  public boolean isAccountNonLocked() {
    return false;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return false;
  }

  @Override
  public boolean isEnabled() {
    return false;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    User user = (User) o;

    if (!Objects.equals(id, user.id)) {
      return false;
    }
    return Objects.equals(username, user.username);
  }

  @Override
  public int hashCode() {
    int result = id != null ? id.hashCode() : 0;
    result = 31 * result + (username != null ? username.hashCode() : 0);
    return result;
  }
}
