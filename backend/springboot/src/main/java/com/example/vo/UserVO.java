package com.example.vo;

import lombok.Data;

/**
 * @ClassName：UserVO
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 17:45
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Data
public class UserVO {
    private Integer userId;
    private String username;
    private String role;
    private String token;
}
