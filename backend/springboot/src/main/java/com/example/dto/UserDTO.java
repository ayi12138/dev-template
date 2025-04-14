package com.example.dto;

import lombok.Data;

/**
 * @ClassName：UserDTO
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 17:45
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Data
public class UserDTO {
    private String username;
    private String password;
    private String role;
}
