package com.example.mapper;

import com.example.entity.User;

import java.util.List;
/**
 *
 * @author  capybara
 * @date    2025/4/11
 * @version 1.0
 * @desc
 */

public interface UserMapper {
    List<User> findAll();

    User selectByUsername(String username);

    Integer insertUser(User user);

    User selectById(int i);
}
