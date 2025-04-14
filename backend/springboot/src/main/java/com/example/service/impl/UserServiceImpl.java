package com.example.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.map.MapUtil;
import com.example.entity.User;
import com.example.exception.CustomerException;
import com.example.mapper.UserMapper;
import com.example.service.UserService;
import com.example.utils.TokenUtil;
import com.example.vo.UserVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName：UserServiceImpl
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 10:55
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource // 默认按类型注入
    UserMapper userMapper;
    public List<User> findAll() {
//        System.out.println(TokenUtil.getCurrentUser());
        return userMapper.findAll();
    }

    @Override
    public UserVO login(User user) {
        User isuser = userMapper.selectByUsername(user.getUsername());
        if (isuser == null) {
            throw new CustomerException("用户不存在");
        } else if (!isuser.getPassword().equals(user.getPassword())) {
            throw new CustomerException("密码错误");
        } else {
//            创建token
            String token = TokenUtil.createToken(isuser.getId().toString() + "-" + isuser.getRole(), isuser.getPassword());
            UserVO UserVO = new UserVO();
            BeanUtil.copyProperties(isuser, UserVO,
                    CopyOptions.create()
                            .setFieldMapping(MapUtil.of("id", "userId"))
                            .setIgnoreProperties("password"));
            UserVO.setToken(token);
            return UserVO;
        }
    }

    @Override
    public Integer register(User user) {
        User isuser = userMapper.selectByUsername(user.getUsername());
        if (isuser != null){
            throw new CustomerException("账号已存在");
        }
        return userMapper.insertUser(user);
    }

    @Override
    public User selectById(int i) {
        return userMapper.selectById(i);
    }
}
