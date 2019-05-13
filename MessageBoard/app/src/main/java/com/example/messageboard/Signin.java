package com.example.messageboard;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.view.ViewGroup;
import android.widget.Toast;
import android.widget.TextView;
import android.content.Context;


public class Signin extends AppCompatActivity {

    private View homeButton;
    private View submitButton;
    private View calendarButton;
    private View contactButton;
    private View gameButton;
    private EditText nameText;
    private EditText emailText;
    private EditText reasonText;
    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.signin);
        context = getApplicationContext();

        homeButton = (View) findViewById(R.id.navigation_home);
        homeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Signin.this, MainActivity.class));
            }
        });

        calendarButton = (View) findViewById(R.id.navigation_calendar);
        calendarButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Signin.this, Scheduler.class));
            }
        });

        submitButton = (View) findViewById(R.id.submitButton);
        nameText = (EditText) findViewById(R.id.nameText);
        emailText = (EditText) findViewById(R.id.emailText);
        reasonText = (EditText) findViewById(R.id.reasonText);

        if(TextUtils.isEmpty(nameText.getText())) {
            nameText.setError("Name is required");
        }
        if(TextUtils.isEmpty(emailText.getText())) {
            emailText.setError("Email is required");
        }
        if(TextUtils.isEmpty(reasonText.getText())) {
            reasonText.setError("Reason is required");
        }
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(TextUtils.isEmpty(nameText.getText())) {
                    nameText.setError("Name is required");
                }
                if(TextUtils.isEmpty(emailText.getText())) {
                    emailText.setError("Email is required");
                }

                if(TextUtils.isEmpty(reasonText.getText())) {
                    reasonText.setError("Reason is required");
                }


                if(!TextUtils.isEmpty(nameText.getText()) && !TextUtils.isEmpty(emailText.getText()) &&
                        !TextUtils.isEmpty(reasonText.getText())) {

                    if(!emailText.getText().toString().contains("@")) {
                        emailText.setError("Email information is invalid");
                    } else {
                        Toast toast = Toast.makeText(context, "Your response has been submitted!", Toast.LENGTH_LONG);
                        toast.setDuration(Toast.LENGTH_LONG + 10);
                        toast.show();

                        nameText.setText("");
                        emailText.setText("");
                        reasonText.setText("");
                    }

                }

            }
        });

        contactButton = (View) findViewById(R.id.navigation_contact);
        contactButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Signin.this, Contact.class));
            }
        });

        gameButton = (View) findViewById(R.id.navigation_game);
        gameButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Signin.this, Game.class));
            }
        });
    }
}
