package com.example.controller;

import com.example.common.ResponseResult;
import com.example.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;


/**
 * @ClassName：WebController
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/5 2:44
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@RestController
public class WebController {
    @GetMapping("/hello")
    public ResponseResult<HashMap<Object, Object>> hello(){
        HashMap<Object, Object> hashMap = new HashMap<>();
//        int i = 1/0;
        hashMap.put("name","tom");
        hashMap.put("age",18);
        return ResponseResult.success(hashMap);
    }

}
