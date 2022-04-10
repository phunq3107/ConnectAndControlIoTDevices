package com.phunq.backend.util;

public class CustomStringUtils {
  public static String encodeStringToIntString(String str) {
    StringBuilder ret = new StringBuilder("1");
    for (int i = 0; i < str.length(); i++) {
      int c = str.charAt(i);
      String s = Integer.toString(c);
      while (s.length() < 3) {
        s = "0" + s;
      }
      ret.append(s);
    }
    return ret.toString();
  }
}
