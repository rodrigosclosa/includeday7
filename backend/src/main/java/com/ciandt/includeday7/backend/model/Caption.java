
package com.ciandt.includeday7.backend.model;

import java.io.Serializable;

import com.google.appengine.repackaged.com.google.gson.annotations.Expose;
import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class Caption implements Serializable
{

    @SerializedName("confidence")
    @Expose
    private Double confidence;
    @SerializedName("text")
    @Expose
    private String text;
    private final static long serialVersionUID = 3467596279118119006L;

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
