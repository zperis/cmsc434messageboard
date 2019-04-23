package com.example.messageboard;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

public class Contact extends AppCompatActivity {

    private View calendarButton;
    private View signinButton;
    private View homeButton;
    private View gameButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.contact);

        homeButton = (View) findViewById(R.id.navigation_home);
        homeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Contact.this, MainActivity.class));
            }
        });

        signinButton = (View) findViewById(R.id.navigation_signin);
        signinButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Contact.this, Signin.class));
            }
        });
        calendarButton = (View) findViewById(R.id.navigation_calendar);
        calendarButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Contact.this, Scheduler.class));
            }
        });

        gameButton = (View) findViewById(R.id.navigation_game);
        gameButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Contact.this, Game.class));
            }
        });
    }
}
