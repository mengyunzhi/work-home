package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;


public class UserServiceImplTest extends ServiceTest{

    UserService userService;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;


    @BeforeEach
    public void beforeEach() {
        super.beforeEach();
        this.userRepository = Mockito.mock(UserRepository.class);
        this.passwordEncoder = Mockito.mock(PasswordEncoder.class);
        this.userService = Mockito.spy(new UserServiceImpl(this.userRepository, this.passwordEncoder));
    }

    @Test
    public void resetPassword() {

        Long id = this.random.nextLong();
        User resultUser = new User();
        resultUser.setId(id);
        Optional <User> resultUserOptional = Optional.of(new User());

        Mockito.doReturn(resultUserOptional).when(userRepository).findById(Mockito.anyLong());
        Mockito.doReturn(resultUser).when(userRepository).save(Mockito.any(User.class));

        userService.resetPassword(id);
        ArgumentCaptor<Long> userIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(userService).resetPassword(userIdArgumentCaptor.capture());
        Long userId = userIdArgumentCaptor.getValue();
        Assertions.assertThat(userId).isEqualTo(id);

    }
}