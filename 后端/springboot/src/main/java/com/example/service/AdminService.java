package com.example.service;

import com.example.exception.CustomerException;
import org.springframework.stereotype.Service;

/**
 * @ClassName：AdminService
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/5 3:44
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Service
public class AdminService {
    public String getAdminInfo(String name) {
        if("admin".equals(name)){
            return "true";
        }
        throw new CustomerException("用户名错误");
    }
}
