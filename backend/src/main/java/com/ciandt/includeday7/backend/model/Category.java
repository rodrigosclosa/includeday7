
package com.ciandt.includeday7.backend.model;

import java.io.Serializable;

import com.google.appengine.repackaged.com.google.gson.annotations.Expose;
import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class Category implements Serializable
{

    @SerializedName("score")
    @Expose
    private Double score;
    @SerializedName("name")
    @Expose
    private String name;
    private final static long serialVersionUID = 1273072598638138436L;

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
