package com.example.entity;

import lombok.Data;

/**
 * @ClassName：User
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 10:19
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    private String role;
}
