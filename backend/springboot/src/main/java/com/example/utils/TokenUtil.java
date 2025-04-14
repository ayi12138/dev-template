package com.example.utils;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.server.HttpServerRequest;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import com.example.entity.User;
import com.example.service.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Date;

/**
 * @ClassName：TokenUtil
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 17:12
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Component
public class TokenUtil {

    @Resource
    UserService userService;

    static UserService staticUserService;

//    springboot 启动时，会调用这个方法，将Bean中的userService注入到staticUserService
    @PostConstruct
    public void setUserService() {
        staticUserService = userService;
    }


//    生成token
    public static String createToken(String data, String sign) {
        return JWT.create().withAudience(data) // 将 user id 保存到 token 里面,作为载荷
                .withExpiresAt(DateUtil.offsetDay(new Date(),1)) // 一天后过期
                .sign(Algorithm.HMAC256(sign));

    }
//    根据通过TokenUtil.getCurrentUser()获取当前登录的用户信息
    public static User getCurrentUser() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String token = request.getHeader("token");

        if(StrUtil.isBlank(token)){
            token = request.getParameter("token");
        }
        User user = null;

        String audience = JWT.decode(token).getAudience().getFirst();
        String[] split = audience.split("-");
        String userId = split[0];
        String role = split[1];

        user = staticUserService.selectById(Integer.parseInt(userId));
        return user;
    }
}
