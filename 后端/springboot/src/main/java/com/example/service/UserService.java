package com.example.service;

import com.example.entity.User;
import com.example.vo.UserVO;

import java.util.List;

public interface UserService {
    List<User> findAll();

    UserVO login(User user);

    Integer register(User user);

    User selectById(int i);
}
