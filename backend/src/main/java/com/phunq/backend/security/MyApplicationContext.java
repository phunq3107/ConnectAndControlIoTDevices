package com.phunq.backend.security;

import com.phunq.backend.entity.User;
import com.phunq.backend.entity.UserRole;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
public class MyApplicationContext {

    public static User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static void setCurrentUser(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public static UserRole getCurrentUserRole() {
        return getCurrentUser().getRole();
    }

    public static Boolean isAdmin() {
        return getCurrentUserRole().equals(UserRole.ADMIN);
    }

    public static Boolean isEmployee() {
        return getCurrentUserRole().equals(UserRole.EMPLOYEE);
    }

    public static String getCurrentUsername() {
        return getCurrentUser().getUsername();
    }
}
