package com.example.controller;

import com.example.common.ResponseResult;
import com.example.entity.User;
import com.example.service.UserService;
import com.example.vo.UserVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;


import java.util.List;

/**
 * @ClassName：UserController
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 11:04
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@RestController
@RequestMapping("/auth")
public class UserController {
    @Resource
    UserService userService;
    @GetMapping("/getAll")
    public ResponseResult<List<User>>getAll() {
        return ResponseResult.success(userService.findAll());
    }
    @PostMapping("/login")
    public ResponseResult<UserVO> login(@RequestBody User user) {

        return ResponseResult.success(userService.login(user));
    }

    @PostMapping("/register")
    public ResponseResult<Boolean> register(@RequestBody User user){
        return ResponseResult.success(userService.register(user) > 0);
    }

    @GetMapping("/logout")
    public ResponseResult<Boolean> logout(){
        return ResponseResult.success(true);
    }
}
